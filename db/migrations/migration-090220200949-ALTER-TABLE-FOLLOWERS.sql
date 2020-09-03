ALTER TABLE followers
ADD UNIQUE (follower_id, followed_id);