function TarjetaDato({ titulo, valor, detalle }) {
  return (
    <div className="border border-gray-300 rounded-card p-5 flex flex-col justify-between gap-2 overflow-hidden">
      <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
        {titulo}
      </p>
      <p className="font-display font-bold text-2xl sm:text-3xl tracking-tight truncate" title={String(valor)}>
        {valor}
      </p>
      {detalle && (
        <p className="text-sm text-gray-600">
          {detalle}
        </p>
      )}
    </div>
  );
}

export default TarjetaDato;
