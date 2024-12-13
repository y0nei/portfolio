let iconMap = new Map<string, string>()

const icons = import.meta.glob(
    "$icons/*.svg",
    { eager: true, query: "?raw", import: "default" }
)

for (const obj in icons) {
    const key: string = obj.slice(14, -4);
    iconMap.set(key, icons[obj] as string)
}

export default iconMap;

