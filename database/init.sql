
-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample tasks
INSERT INTO tasks (title, description)
VALUES
    ('Learn Docker', 'Understand Docker containers'),
    ('Learn Docker Compose', 'Manage multiple containers'),
    ('Complete DevOps Assignment', 'Finish the full-stack Docker project');
