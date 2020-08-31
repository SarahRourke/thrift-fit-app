CREATE TABLE IF NOT EXISTS shopping_carts (
	id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
	shopping_cart_item INTEGER NOT NULL,
	is_sale_completed BOOLEAN DEFAULT 'false',
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (shopping_cart_item) REFERENCES outfits(id)
);