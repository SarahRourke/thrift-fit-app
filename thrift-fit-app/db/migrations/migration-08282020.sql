\c thrift_fit


CREATE TABLE IF NONE EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS outfits (
    id SERIAL PRIMARY KEY,
    is_sold BOOLEAN,
    user_id FOREIGN KEY()
)