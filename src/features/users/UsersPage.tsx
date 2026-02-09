import { useLazyGetUsersQuery } from "../../app/services/api";

const UsersPage = () => {
  const [fetchUsers, { data = [], isFetching, isError, isUninitialized }] =
    useLazyGetUsersQuery();

  const hasResults = !isUninitialized && !isFetching && !isError;

  return (
    <div className="page">
      <div className="users">
        <div className="users-header">
          <div>
            <h2>Пользователи</h2>
            <p>Коллекция profi_users из бэка Render.</p>
          </div>
          <button
            type="button"
            className="button primary"
            onClick={() => fetchUsers()}
            disabled={isFetching}
          >
            {isFetching ? "Загрузка..." : "Получить пользователей"}
          </button>
        </div>

        {isError ? (
          <div className="users-error">Не удалось загрузить пользователей.</div>
        ) : null}

        {hasResults && data.length === 0 ? (
          <div className="users-empty">Пользователи не найдены.</div>
        ) : null}

        {hasResults && data.length > 0 ? (
          <div className="user-grid">
            {data.map((user) => (
              <article className="user-card" key={user._id}>
                <div className="user-head">
                  <h3>{user.username}</h3>
                  <span
                    className={`user-status ${user.isActive ? "active" : "inactive"}`}
                  >
                    {user.isActive ? "Активен" : "Неактивен"}
                  </span>
                </div>
                <div className="user-meta">{user.email}</div>
                <div className="user-meta">Возраст: {user.age}</div>
                <div className="tag">
                  {(user.role ?? []).length ? user.role.join(" · ") : "без роли"}
                </div>
                <div className="user-date">
                  Создан: {new Date(user.createdAt).toLocaleDateString("ru-RU")}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UsersPage;
