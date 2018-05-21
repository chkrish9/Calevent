/*TagTitle table*/
CREATE TABLE IF NOT EXISTS tagtitle (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, imagename  TEXT);
INSERT INTO tagtitle (id, title, imagename) values (1, "Birthday","assets/imgs/birthday.jpg");
INSERT INTO tagtitle (id, title, imagename) values (2, "Marriage day","assets/imgs/marriagean.jpg");
INSERT INTO tagtitle (id, title, imagename) values (3, "Company","assets/imgs/company.jpg");
INSERT INTO tagtitle (id, title, imagename) values (4, "Special","assets/imgs/special.jpg");
/*Tags table*/
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tagname TEXT,
    tagtitleid INTEGER,
    FOREIGN KEY(tagtitleid) REFERENCES tagtitle(id));
INSERT INTO tags (tagname, tagtitleid) VALUES (
    "b'dy",
    1
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "birthday",
    1
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "marriage",
    2
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "anniversary",
    2
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "work",
    3
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "developer",
    3
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "join",
    3
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "talk",
    4
);
INSERT INTO tags(tagname, tagtitleid) VALUES(
    "saw",
    4
);

