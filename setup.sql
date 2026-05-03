CREATE DATABASE IF NOT EXISTS rbac_db;
USE rbac_db;

-- 1. Tabel Roles
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) UNIQUE NOT NULL
        );

        -- 2. Tabel Permissions
        CREATE TABLE IF NOT EXISTS permissions (
            id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) UNIQUE NOT NULL,
                resource VARCHAR(50),
                action VARCHAR(50)
                );

                -- 3. Tabel Users
                CREATE TABLE IF NOT EXISTS users (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                        username VARCHAR(50) UNIQUE NOT NULL,
                            password VARCHAR(255) NOT NULL,
                                role_id INT,
                                    FOREIGN KEY (role_id) REFERENCES roles(id)
                                    );

                                    -- 4. Tabel Pivot Role_Permissions
                                    CREATE TABLE IF NOT EXISTS role_permissions (
                                        role_id INT,
                                            permission_id INT,
                                                PRIMARY KEY (role_id, permission_id),
                                                    FOREIGN KEY (role_id) REFERENCES roles(id),
                                                        FOREIGN KEY (permission_id) REFERENCES permissions(id)
                                                        );

                                                        -- 5. Data Percobaan (Seeding)
                                                        -- Clear old data (order penting karena FK)
                                                        DELETE FROM role_permissions;
                                                        DELETE FROM users;
                                                        DELETE FROM permissions;
                                                        DELETE FROM roles;
                                                        
                                                        -- Reset auto_increment
                                                        ALTER TABLE roles AUTO_INCREMENT = 1;
                                                        ALTER TABLE permissions AUTO_INCREMENT = 1;
                                                        ALTER TABLE users AUTO_INCREMENT = 1;
                                                        
                                                        INSERT INTO roles (id, name) VALUES (1, 'admin'), (2, 'viewer');
                                                        INSERT INTO permissions (id, name, resource, action) VALUES 
                                                        (1, 'user:view', 'users', 'view'),
                                                        (2, 'user:create', 'users', 'create'),
                                                        (3, 'user:edit', 'users', 'edit'),
                                                        (4, 'user:delete', 'users', 'delete'),
                                                        (5, 'role:view', 'roles', 'view'),
                                                        (6, 'role:create', 'roles', 'create'),
                                                        (7, 'role:delete', 'roles', 'delete'),
                                                        (8, 'permission:view', 'permissions', 'view'),
                                                        (9, 'permission:create', 'permissions', 'create'),
                                                        (10, 'permission:assign', 'permissions', 'assign');

                                                        -- Admin dapat semua permission, Viewer cuma view
                                                        INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES 
                                                        (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
                                                        (2, 1), (2, 5), (2, 8);

                                                        -- Password admin_user adalah 'password123'
                                                        INSERT IGNORE INTO users (username, password, role_id) VALUES ('admin_user', 'password123', 1);
                                                        INSERT IGNORE INTO users (username, password, role_id) VALUES ('viewer_user', 'password123', 2);