/** schema.org JSON-LD blogu. Sayfada gorunmez, tarayicilar ve modeller icin. */
export function YapisalVeri({ veri }: { veri: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(veri) }}
    />
  );
}
