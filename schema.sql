CREATE TABLE IF NOT EXISTS
simpson(
  id SERIAL PRIMARY KEY NOT NULL,
  quote VARCHAR(255) NOT NULL,
  character VARCHAR(255) NOT NULL,
   image TEXT NOT NULL,
  characterDirection VARCHAR(255)
);