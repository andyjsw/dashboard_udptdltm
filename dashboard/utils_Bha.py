

def prepare_for_donut(_unique_df):

    name_price_genre_df = _unique_df[['name', 'price_format', 'genre']]
    name_price_genre_df = name_price_genre_df.set_index('name')

    name_price_genre_dict = name_price_genre_df.to_dict()

    name_price_dict = name_price_genre_dict['price_format']
    name_genre_dict = name_price_genre_dict['genre']

    return name_price_dict, name_genre_dict