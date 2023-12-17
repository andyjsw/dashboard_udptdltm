from django.shortcuts import render
import plotly.express as px
from datetime import datetime
from datetime import timedelta
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

path_unique_dataset = "./data/2023-12-02-unique.json"
path_daily_dataset = "./data/2023-12-02-daily.json"

unique_df = pd.read_json(path_unique_dataset, orient="index")
daily_df = pd.read_json(path_daily_dataset, orient="index")


def str_to_datetime(dt: str):
    return datetime.strptime(dt, '%d-%m-%Y_%H-%M-%S')


# KB
def getData_OneMonth(df):
    tmp_df = df.__deepcopy__()
    date_now = max(daily_df.date)
    filter_MONTH = date_now - timedelta(days=30)
    tmp_df = tmp_df[(tmp_df.date>=filter_MONTH) & (tmp_df.date<date_now)]
    tmp_df.date = tmp_df.date.apply(lambda x: int(x.timestamp()*1000))
    tmp_df = tmp_df.sort_values(by=["date","hour"],ascending=[True,True]).reset_index(drop=True)

    return tmp_df.to_dict()


# Bha
def prepare_for_donut(_unique_df):

    name_price_genre_df = _unique_df[['name', 'price_format', 'genre']]
    name_price_genre_df = name_price_genre_df.set_index('name')

    name_price_genre_dict = name_price_genre_df.to_dict()

    name_price_dict = name_price_genre_dict['price_format']
    name_genre_dict = name_price_genre_dict['genre']

    return name_price_dict, name_genre_dict


def dashboard(request):
    # Bha
    name_price_dict, name_genre_dict = prepare_for_donut(unique_df)

    # KB
    dataOneMonth = getData_OneMonth(daily_df)
    uniqueData_dict = unique_df.to_dict()

    context = {
        # Bha
        'name_price_dict': json.dumps(name_price_dict),
        'name_genre_dict': json.dumps(name_genre_dict),

        # KB
        'uniqueData': json.dumps(uniqueData_dict),
        "dataOneMonth" : json.dumps(dataOneMonth),
    }

    return render(request, 'dashboard/dashboard.html', context=context)