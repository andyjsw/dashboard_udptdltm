from datetime import timedelta


def getData_OneMonth(df, date_now):
    tmp_df = df.__deepcopy__()
    filter_MONTH = date_now - timedelta(days=30)
    tmp_df = tmp_df[(tmp_df.date>=filter_MONTH) & (tmp_df.date<date_now)]
    tmp_df.date = tmp_df.date.apply(lambda x: int(x.timestamp()*1000))
    tmp_df = tmp_df.sort_values(by=["date","hour"],ascending=[True,True]).reset_index(drop=True)

    return tmp_df.to_dict()