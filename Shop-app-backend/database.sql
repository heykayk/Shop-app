CREATE database ShopApp;

USE ShopApp;
-- KHÁCH HÀNG KHI MUỐN MUA HÀNG => PHẢI ĐĂNG KÍ TÀI KHOẢN => BẢNG USERS
CREATE table users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100) DEFAULT '',
    phone_number VARCHAR(10) NOT NULL,
    address VARCHAR(200) DEFAULT '',
    password VARCHAR(100) NOT NULL DEFAULT '', 
    created_at DATETIME,
    updated_at DATETIME,
    is_active TINYINT(1) DEFAULT 1,
    date_of_birth DATE,
    facebook_account_id INT DEFAULT 0,
    google_account_id INT DEFAULT 0
);

ALTER TABLE users ADD COLUMN role_id INT;
CREATE TABLE roles(
    id INT PRIMARY KEY,
    name VARCHAR(20) NOT NULL 
);
ALTER TABLE users ADD FOREIGN KEY(role_id) REFERENCES roles(id);

CREATE TABLE tokens(
    id INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) UNIQUE NOT NULL,
    token_type VARCHAR(50) NOT NULL,
    expiration_date DATETIME,
    revoked TINYINT(1) NOT NULL,
    expired TINYINT(1) NOT NULL,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- HỖ TRỢ ĐĂNG NHẬP BẰNG TỪ FACEBOOK VÀ GOOGLE
CREATE TABLE social_accounts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    provider VARCHAR(20) NOT NULL COMMENT'Tên nhà social network',
    provider_id VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL COMMENT'Email tài khoản',
    name VARCHAR(50) NOT NULL COMMENT'Tên người dùng',
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- BẢNG DANH MỤC SẢN PHẨM(CATEGORY)
CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL DEFAULT'' COMMENT'Tên danh mục, vd: đồ điện tử'
);

-- BẢNG CHỨA SẢN PHẨM: "laptop macbook ari 15 inch 2023"
CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(350) COMMENT'Tên sản phẩm',
    price FLOAT NOT NULL CHECK(price >= 0), 
    thumbnail VARCHAR(300) DEFAULT '',
    description LONGTEXT,
    created_at DATETIME, 
    updated_at DATETIME,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ĐẶT HÀNG (orders)
CREATE TABLE orders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    fullname VARCHAR(100) DEFAULT '',
    email VARCHAR(100) DEFAULT '',
    phone_number VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL,
    note VARCHAR(100) DEFAULT '',
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20),
    total_money FLOAT CHECK(total_money >= 0)
);
ALTER TABLE orders add COLUMN shipping_method VARCHAR(100);
ALTER TABLE orders add COLUMN shipping_address VARCHAR(200);
ALTER TABLE orders add COLUMN shipping_date DATE;
ALTER TABLE orders add COLUMN tracking_number VARCHAR(100);
ALTER TABLE orders add COLUMN payment_method VARCHAR(100);

CREATE TABLE order_details
