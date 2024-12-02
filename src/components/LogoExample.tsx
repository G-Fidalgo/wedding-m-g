import { useEventStore } from '@/store/eventStore';

export const LogoExample = () => {
  // TODO: Handle null values with default
  const logoImage = useEventStore((state) => state.logo);
  const weddingName = useEventStore((state) => state.name);

  if (logoImage) {
    return (
      <div className="flex gap-2">
        <div
          className="w-28 h-28 relative bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${logoImage})` }}
        ></div>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <div className="flex items-center text-black">
        <span className="block border-2 border-current size-7 rounded-full" />
        <span className="block border-2 border-current size-7 rounded-full -ml-3" />
      </div>
      <p className="border-l font-bold border-black pl-2">{weddingName}</p>
    </div>
  );
};
