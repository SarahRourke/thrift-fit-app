\c thrift_fit

CREATE TABLE IF NOT EXISTS outfits (
    id SERIAL PRIMARY KEY,
    username VARCHAR REFERENCES users(username),
    is_sold BOOLEAN,
    description TEXT
);