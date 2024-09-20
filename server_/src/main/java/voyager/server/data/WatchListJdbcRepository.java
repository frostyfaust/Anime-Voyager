package voyager.server.data;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WatchListJdbcRepository {

    private final JdbcClient jdbcClient;

    public WatchListJdbcRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Integer> getWatchList(String username) {

        final String sql = "SELECT anime_id FROM watch_list WHERE username "
                + "= ?";

        return jdbcClient.sql(sql)
                .param(username)
                .query(Integer.class)
                .list();
    }

    public boolean watchListAdd(String username, int animeId) {
        final String sql = "INSERT INTO watch_list (username, anime_id) "
                + "VALUES (?, ?)";

        return jdbcClient.sql(sql)
                .params(username,
                        animeId)
                .update() > 0;
    }

    public boolean watchListDelete(String username, int animeId) {
        final String sql = "DELETE FROM watch_list WHERE username = ? AND "
                + "anime_id = ?";

        return jdbcClient.sql(sql)
                .params(username,
                        animeId)
                .update() > 0;
    }
}
