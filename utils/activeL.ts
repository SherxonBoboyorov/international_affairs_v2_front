/**
 * Ob'ektdan joriy tildagi nomni olish funksiyasi
 * @param item - Ma'lumot ob'ekti
 * @param name - Maydon nomi (default: name)
 */
export default (
  item: null | Record<string, any> | undefined,
  name?: string
): any => {
  const nuxtApp = useNuxtApp();
  if (item) {
    const locale = (nuxtApp.$i18n as any).locale.value;
    const itemName = name ? `${name}_${locale}` : `name_${locale}`;
    return item[itemName];
  }
  return undefined;
};
