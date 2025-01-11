DROP TABLE IF EXISTS assetZoneHistory;
DROP TABLE IF EXISTS assetPositionHistory;
DROP TABLE IF EXISTS Zones;
DROP TABLE IF EXISTS Assets;
DROP TABLE IF EXISTS FloorMaps;

CREATE TABLE FloorMaps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(500000)
);

CREATE TABLE Assets (
    id SERIAL PRIMARY KEY,
    floorMapId INT REFERENCES FloorMaps(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    x INT NOT NULL,
    y INT NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Zones (
    id SERIAL PRIMARY KEY,
    floorMapId INT REFERENCES FloorMaps(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    points JSON NOT NULL
);

CREATE TABLE PositionHistories (
    id SERIAL PRIMARY KEY,
    assetId INT REFERENCES Assets(id) ON DELETE CASCADE,
    floorMapId INT REFERENCES FloorMaps(id) ON DELETE CASCADE,
    x INT NOT NULL,
    y INT NOT NULL,
    dateTime TIMESTAMP NOT NULL
);