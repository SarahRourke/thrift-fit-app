\c thrift_fit

CREATE TABLE IF NOT EXISTS outfits (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    is_sold BOOLEAN DEFAULT 'false',
    description TEXT,
    img_url VARCHAR(255)
);