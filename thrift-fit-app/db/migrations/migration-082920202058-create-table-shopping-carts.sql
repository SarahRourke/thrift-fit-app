  
CREATE TABLE IF NOT EXISTS shopping_carts (
	id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
	is_sale_completed BOOLEAN DEFAULT 'false'   
);