package voyager.server.data;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlanToWatchJdbcRepository {

        private final JdbcClient jdbcClient;

        public PlanToWatchJdbcRepository(JdbcClient jdbcClient) {
            this.jdbcClient = jdbcClient;
        }

        public List<Integer> getPlanToWatch(String username) {

            final String sql = "SELECT anime_id FROM plan_to_watch_list WHERE username "
                    + "= ?";

            return jdbcClient.sql(sql)
                    .param(username)
                    .query(Integer.class)
                    .list();
        }

        public boolean planToWatchAdd(String username, int animeId) {
            final String sql = "INSERT INTO plan_to_watch_list (username, anime_id) "
                    + "VALUES (?, ?)";

            return jdbcClient.sql(sql)
                    .params(username,
                            animeId)
                    .update() > 0;
        }

        public boolean planToWatchDelete(String username, int animeId) {
            final String sql = "DELETE FROM plan_to_watch_list WHERE username = ? AND "
                    + "anime_id = ?";

            return jdbcClient.sql(sql)
                    .params(username,
                            animeId)
                    .update() > 0;
        }
}
