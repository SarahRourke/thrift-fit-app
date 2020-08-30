CREATE TABLE IF NOT EXISTS shopping_cart_items (
	id SERIAL PRIMARY KEY,
    shopping_cart_id INTEGER NOT NULL,
    item_id INTEGER,
    FOREIGN KEY (shopping_cart_id) REFERENCES shopping_carts(id),
    FOREIGN KEY (item_id) REFERENCES outfits(id)
);