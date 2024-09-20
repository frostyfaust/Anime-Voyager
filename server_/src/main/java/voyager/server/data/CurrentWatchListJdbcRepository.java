package voyager.server.data;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CurrentWatchListJdbcRepository {

    private final JdbcClient jdbcClient;

    public CurrentWatchListJdbcRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Integer> getCurrentList(String username) {

        final String sql = "SELECT anime_id FROM current_watch_list WHERE username "
                + "= ?";

        return jdbcClient.sql(sql)
                .param(username)
                .query(Integer.class)
                .list();
    }

    public boolean currentListAdd(String username, int animeId) {
        final String sql = "INSERT INTO current_watch_list (username, anime_id) "
                + "VALUES (?, ?)";

        return jdbcClient.sql(sql)
                .params(username,
                        animeId)
                .update() > 0;
    }

    public boolean currentListDelete(String username, int animeId) {
        final String sql = "DELETE FROM current_watch_list WHERE username = ? AND "
                + "anime_id = ?";

        return jdbcClient.sql(sql)
                .params(username,
                        animeId)
                .update() > 0;
    }
}
