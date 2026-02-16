import { useGetProvidersQuery } from "@/app/services/api.ts";

const roleLabels: Record<string, string> = {
  customer: "заказчик",
  worker: "исполнитель"
};

const ProvidersPage = () => {
  const { data = [] } = useGetProvidersQuery();

  return (
    <div className="page">
      <div className="providers">
        <div className="providers-header">
          <h2>Исполнители рядом</h2>
          <p>Доступно: {data.length}</p>
        </div>
        <div className="provider-grid">
          {data.map((provider) => (
            <article className="provider-card" key={provider.id}>
              <h3>{provider.name}</h3>
              <div>{roleLabels[provider.role] ?? provider.role}</div>
              <div className="tag">Рейтинг: {provider.rating}</div>
              <div className="tag">{provider.tags.join(" · ")}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProvidersPage;
