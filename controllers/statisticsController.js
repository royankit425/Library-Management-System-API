const db = require('../config/db');

exports.getStatistics = async (req, res) => {
    try {
        // TOTAL USERS
        const [totalUsers] = await db.query('SELECT COUNT(*) AS total FROM Users');

        // TOTAL BOOKS
        const [totalBooks] = await db.query('SELECT COUNT(*) AS total FROM Books');

        // TOTAL LENT BOOKS
        const [totalLentBooks] = await db.query('SELECT COUNT(*) AS total FROM Records WHERE status = "Issued"');

        // HIGHEST LENT BOOK
        const [highestLentBook] = await db.query(`
            SELECT b.title, COUNT(r.book_id) AS lend_count
            FROM Records r
            JOIN Books b ON r.book_id = b.id
            WHERE r.status = "Issued"
            GROUP BY r.book_id
            ORDER BY lend_count DESC
            LIMIT 1
        `);

        // MOST ACTIVE USER
        const [mostActiveUser] = await db.query(`
            SELECT u.name, COUNT(r.user_id) AS activity_count
            FROM Records r
            JOIN Users u ON r.user_id = u.id
            GROUP BY r.user_id
            ORDER BY activity_count DESC
            LIMIT 1
        `);

        // OLDEST BOOK
        const [oldestBook] = await db.query('SELECT title, publication_year FROM Books ORDER BY publication_year ASC LIMIT 1');

        // NEWEST BOOK
        const [newestBook] = await db.query('SELECT title, publication_year FROM Books ORDER BY publication_year DESC LIMIT 1');

        // MOST AVAILABLE BOOK
        const [mostAvailableBook] = await db.query('SELECT title, copies_available FROM Books ORDER BY copies_available DESC LIMIT 1');

        //RESPONSE
        res.status(200).json({
            success: true,
            statistics: {
                totalUsers: totalUsers[0]?.total || 0,
                totalBooks: totalBooks[0]?.total || 0,
                totalLentBooks: totalLentBooks[0]?.total || 0,
                highestLentBook: highestLentBook[0] || null,
                mostActiveUser: mostActiveUser[0] || null,
                oldestBook: oldestBook[0] || null,
                newestBook: newestBook[0] || null,
                mostAvailableBook: mostAvailableBook[0] || null,
            },
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics.',
            error: error.message,
        });
    }
};

