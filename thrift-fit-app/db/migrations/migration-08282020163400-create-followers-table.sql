\c thrift_fit

CREATE TABLE IF NOT EXISTS followers (
    instance_id SERIAL PRIMARY KEY,
    follower_id INT NOT NULL REFERENCES users(id),
    followed_id INT NOT NULL REFERENCES users(id)
);