from django.shortcuts import render
import plotly.express as px
from datetime import datetime
import pandas as pd
import numpy as np
import json

pd.set_option("display.max_colwidth", 250)

from tqdm import tqdm
tqdm.pandas()

import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme()

from collections import Counter

import plotly.express as px
import plotly.io as pio
import plotly.graph_objs as go
from ipywidgets import interact

path_unique_dataset = "data/2023-12-02-unique.json"
unique_df = pd.read_json(path_unique_dataset, orient="index")


def str_to_datetime(dt: str):
    return datetime.strptime(dt, '%d-%m-%Y_%H-%M-%S')


def game_rank1_player_by_hour():
    df_org = pd.read_csv('data/preprocessed_data.csv', index_col=0)
    df = df_org[df_org['rank']==1]
    df_game_hour = df[['name', 'hour', 'current_player']]
    df_gb_game_hour = df_game_hour.groupby(['name', 'hour']).mean()
    df_gb_game_hour['current_player'].astype(int)
    exdf = df_gb_game_hour.reset_index()
    fig = px.line(exdf, x='hour', y='current_player', color='name', title='Average player by hour of Counter-Strike 2')
    fig.update_layout(xaxis = dict(
        tickmode = 'linear',
        dtick = 1
    ))
    return fig.to_html(div_id='1')


def game_top3_player_by_hour():
    df_org = pd.read_csv('data/preprocessed_data.csv', index_col=0)
    df = df_org[df_org['rank']<=3]
    df_game_hour = df[['name', 'hour', 'current_player']]
    df_gb_game_hour = df_game_hour.groupby(['name', 'hour']).mean()
    df_gb_game_hour['current_player'].astype(int)
    exdf = df_gb_game_hour.reset_index()
    fig = px.line(exdf, x='hour', y='current_player', color='name', title='Average player by hour of games in top 3')
    fig.update_layout(xaxis = dict(
        tickmode = 'linear',
        dtick = 1
    ))
    return fig.to_html(div_id='2')


def line_plot_sum_current_player(df, attr):
    temp = df.groupby(by=["date","hour"])[attr].sum().to_frame().sort_index()
    fig = go.Figure()

    x_values = temp.index.get_level_values('date').astype(str) + ' ' + temp.index.get_level_values('hour').astype(str)
    y_values = temp['current_player']

    fig = go.Figure(data=go.Scatter(x=x_values, y=y_values))


    fig.update_layout(hovermode='x unified')
    fig.update_layout(title='Sum of current players', xaxis_title='Time', yaxis_title="Sum of players")
    return fig


def line_plot(df, attr_x, attr_y):
    fig = go.Figure()

    x_values = df[attr_x]
    y_values = df[attr_y]
    fig = px.scatter(x=x_values, y=y_values)
    fig.update_layout(hovermode='x unified')
    fig.update_layout(title='Scatter plot', xaxis_title=attr_x, yaxis_title=attr_y)
    return fig


def plot_current_player_by_game(df, top=3):
    fig = go.Figure()
    top_games = df.value_counts(subset=["name","rank"]).to_frame().reset_index().sort_values(by=["count","rank"],ascending=[False,True]).name[:top].values
    for game in top_games:
        temp = df[df.name == game]
        x_values = temp['date'].astype(str) + ' ' + temp['hour'].astype(str)
        y_values = temp['current_player']
        fig.add_trace(go.Scatter(x=x_values, y=y_values,mode="lines",name=game))


    fig.update_layout(hovermode='x unified')
    fig.update_layout(title='Current players by game', xaxis_title='Time', yaxis_title="Sum of players")
    return fig


def visualization_KB():
    path_daily_dataset = "data/2023-12-02-daily.json"

    daily_df = pd.read_json(path_daily_dataset, orient="index")

    # fig1 = line_plot_sum_current_player(daily_df,"current_player")
    fig2 = line_plot(daily_df,"num_pos_reviews", "current_player")
    # fig3 = plot_current_player_by_game(daily_df,10)

    return pio.to_html(fig2, full_html=False)


def display_charts(request):
    plot345 = visualization_KB()

    context = {
        'plot1': game_rank1_player_by_hour(),
        'plot2': game_top3_player_by_hour(),
        'plot3': plot345, 
    }

    return render(request, 'displaycharts.html', context)


def simple_line_chart():
    fig = px.bar(x=[1, 2, 3, 4, 5], y=[1, 2, 3, 4, 5])

    return pio.to_html(fig, full_html=False)


def dashboard(request):
    
    context = {
        '2023_12_02_daily_json': json.dumps(json_file),
        'rank': json.dumps(rank),
        'plot1': json.dumps({'plot1': simple_line_chart()}),
    }

    return render(request, 'dashboard/dashboard.html', context=context)


def prepare_for_donut(df):
    return df[['price_format', 'genre', 'date']]


def dashboard(request):
    context = {
        'donut_df': prepare_for_donut(unique_df).to_json(),
    }

    return render(request, 'dashboard/dashboard.html', context=context)