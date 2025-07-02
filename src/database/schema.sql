-- Blago-Vsem Database Schema V2
-- This schema introduces a structured way to handle projects and their associated images.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create project categories enum
CREATE TYPE project_category AS ENUM ('residential', 'commercial', 'industrial', 'infrastructure');

-- 1. Projects Table
-- Stores the core information for each project.
CREATE TABLE IF NOT EXISTS projects (
    id uuid not null default gen_random_uuid (),
    title text null,
    image_url text not null,
    created_at timestamp with time zone null default timezone ('utc'::text, now()),
    category text null,
    constraint projects_pkey primary key (id),
    constraint projects_category_check check (
      (
        category = any (
          array[
            'interior'::text,
            'exterior'::text,
            'commercial'::text,
            'private'::text,
            'public'::text
          ]
        )
      )
    )
) TABLESPACE pg_default;

-- 2. Project Images Table
-- Stores all images associated with a project.
CREATE TABLE IF NOT EXISTS project_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0, -- To control the order of images in a gallery
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Messages Table (remains the same)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Function to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
-- Make tables public to read, but restricted for modifications.

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone." ON projects FOR SELECT USING (true);
-- To allow admin modifications, you would add a policy like:
-- CREATE POLICY "Admins can insert/update/delete projects." ON projects FOR ALL USING (auth.role() = 'service_role');

-- Project Images
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Project images are viewable by everyone." ON project_images FOR SELECT USING (true);
-- CREATE POLICY "Admins can insert/update/delete project images." ON project_images FOR ALL USING (auth.role() = 'service_role');

-- Contact Messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact message." ON contact_messages FOR INSERT WITH CHECK (true);
-- Authenticated users (e.g., admins) can manage messages.
CREATE POLICY "Authenticated users can manage messages." ON contact_messages FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- SAMPLE DATA
-- To get started, you can run these inserts in your Supabase SQL editor.
-- Make sure the image URLs point to images in your Supabase Storage.

-- First, insert projects
INSERT INTO projects (id, title, category, description, location, year, cover_image_url) VALUES
('modern-house-uz', 'Современный дом в Узбекистане', 'interior', 'Проект современного частного дома с фокусом на минимализм и натуральные материалы.', 'Ташкент, Узбекистан', 2023, '/projects/modern-house-uz/cover.jpg'),
('luxury-apartments-samarkand', 'Апартаменты в Самарканде', 'interior', 'Дизайн-проект для элитных апартаментов с панорамным видом на город.', 'Самарканд, Узбекистан', 2022, '/projects/luxury-apartments-samarkand/cover.jpg'),
('commercial-center-bukhara', 'Торговый центр в Бухаре', 'exterior', 'Архитектурный проект для нового торгового центра, сочетающий современные и традиционные мотивы.', 'Бухара, Узбекистан', 2023, '/projects/commercial-center-bukhara/cover.jpg'),
('office-space-renovation', 'Реновация офисного пространства', 'public', 'Полная перепланировка и дизайн офисных помещений для IT-компании.', 'Ташкент, Узбекистан', 2021, '/projects/office-space-renovation/cover.jpg');

-- Then, insert images for each project
-- Images for 'modern-house-uz'
INSERT INTO project_images (project_id, image_url, alt_text, display_order) VALUES
('modern-house-uz', '/projects/modern-house-uz/gallery-1.jpg', 'Гостиная с панорамными окнами', 1),
('modern-house-uz', '/projects/modern-house-uz/gallery-2.jpg', 'Кухня в минималистичном стиле', 2),
('modern-house-uz', '/projects/modern-house-uz/gallery-3.jpg', 'Спальня с видом на сад', 3);

-- Images for 'luxury-apartments-samarkand'
INSERT INTO project_images (project_id, image_url, alt_text, display_order) VALUES
('luxury-apartments-samarkand', '/projects/luxury-apartments-samarkand/gallery-1.jpg', 'Общий вид гостиной', 1),
('luxury-apartments-samarkand', '/projects/luxury-apartments-samarkand/gallery-2.jpg', 'Зона отдыха у окна', 2);

-- Images for 'commercial-center-bukhara'
INSERT INTO project_images (project_id, image_url, alt_text, display_order) VALUES
('commercial-center-bukhara', '/projects/commercial-center-bukhara/gallery-1.jpg', 'Внешний вид фасада', 1),
('commercial-center-bukhara', '/projects/commercial-center-bukhara/gallery-2.jpg', 'Центральный атриум', 2);

-- Insert sample data for services
INSERT INTO services (title, description, icon, features, price_range, duration, active) VALUES
('Архитектурное проектирование', 'Полный цикл архитектурного проектирования от эскиза до рабочих чертежей', 'PenTool', ARRAY['Эскизный проект', 'Архитектурный проект', 'Рабочая документация', '3D визуализация'], 'От 500$ за проект', '2-4 месяца', true),
('Строительство под ключ', 'Комплексное строительство зданий и сооружений любой сложности', 'Building', ARRAY['Фундаментные работы', 'Возведение стен', 'Кровельные работы', 'Внутренняя отделка'], 'От 300$ за м²', '6-18 месяцев', true),
('Дизайн интерьера', 'Создание уникальных интерьерных решений для жилых и коммерческих помещений', 'Palette', ARRAY['Планировочные решения', 'Подбор материалов', 'Авторский надзор', 'Декорирование'], 'От 50$ за м²', '1-3 месяца', true),
('Инженерные системы', 'Проектирование и монтаж всех видов инженерных коммуникаций', 'Settings', ARRAY['Электроснабжение', 'Водоснабжение', 'Отопление', 'Вентиляция'], 'От 100$ за м²', '1-2 месяца', true); 