CREATE DATABASE IF NOT EXISTS dynamic_builder;
USE dynamic_builder;

CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100),
  table_name VARCHAR(100)
);
