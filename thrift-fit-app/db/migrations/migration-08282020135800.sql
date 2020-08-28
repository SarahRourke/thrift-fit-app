\c thrift_fit

CREATE TABLE IF NOT EXISTS outfits (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    is_sold BOOLEAN,
    description TEXT
);