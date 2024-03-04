-- 1. create DB
sqlite3 DB.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS Categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income'))
);

CREATE TABLE IF NOT EXISTS Transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  amount REAL NOT NULL,
  date INTEGER NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income')),
  FOREIGN KEY (category_id) REFERENCES Categories (id)
 );

-- 3. insert data
INSERT INTO Categories (name, type) VALUES ('Утилиты', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Электроника', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Ужинать вне дома', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Принадлежности для завтрака', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Домашняя утварь', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Подарки на Рождество', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Новогодние праздничные атрибуты', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Продукты на День Благодарения', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Бонус', 'Income');
INSERT INTO Categories (name, type) VALUES ('Консультационная работа', 'Income');
INSERT INTO Categories (name, type) VALUES ('Неполная работа', 'Income');
INSERT INTO Categories (name, type) VALUES ('Интернет-продажи', 'Income');
INSERT INTO Categories (name, type) VALUES ('Писатель-фрилансер', 'Income');
INSERT INTO Categories (name, type) VALUES ('Бонус в конце года', 'Income');


-- 4. confirm data was inserted
select * from Categories;
-- 1|Groceries|Expense
-- 2|Rent|Expense
-- 3|Salary|Income
-- 4|Freelancing|Income

-- Expenses
-- February 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 100.50, 1709814000, 'Еженедельные продукты', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 75.25, 1709900400, 'Больше продуктов', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 1200, 1707740400, 'Месячная оплата', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 45.99, 1710082800, 'Закуски и напитки', 'Expense');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 60.00, 1707154800, 'Принадлежности для завтрака', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 110.75, 1707241200, 'Домашняя утварь', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 50.25, 1707327600, 'Счет за коммунальные услуги', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 200.50, 1707414000, 'Электроника', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 15.99, 1707500400, 'Ужинать вне дома', 'Expense');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 90.00, 1704562800, 'Подарки на Рождество', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 120.75, 1704649200, 'Товары для новогодней вечеринки', 'Expense');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 85.50, 1701970800, 'Продукты на День Благодарения', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 900, 1702057200, 'Аренда ноябрь', 'Expense');


-- Income
-- February 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3000, 1709914800, 'Месячная зарплата', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 500, 1710001200, 'Фриланс проект', 'Income');

-- January 2024
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3200, 1707266800, 'Бонус', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 450, 1707353200, 'Консультационная работа', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 2800, 1707439600, 'Неполная занятость', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 600, 1707526000, 'Интернет-продажи', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 1500, 1707612400, 'Внештатное письмо', 'Income');

-- December 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 3100, 1704675600, 'Бонус в конце года', 'Income');

-- November 2023
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 700, 1702083600, 'Интернет-продажи', 'Income');

-- 5. confirm again
select * from Transactions;
-- 1|1|100.5|2023-01-10|Weekly groceries|Expense
-- 2|1|75.25|2023-01-17|More groceries|Expense
-- 3|2|1200.0|2023-01-01|Monthly rent|Expense
-- 4|1|45.99|2023-01-24|Snacks and drinks|Expense
-- 5|3|3000.0|2023-01-15|Monthly salary|Income
-- 6|4|500.0|2023-01-20|Freelance project|Income

-- 6. exit db
.quit