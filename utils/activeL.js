export default (item, name) => {
  const nuxtApp = useNuxtApp();
  if (item) {
    let itemName = name
      ? `${name}_${nuxtApp.$i18n.locale.value}`
      : `name_${nuxtApp.$i18n.locale.value}`;
    return item[itemName];
  }
};
