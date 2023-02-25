/**
 * Multi-language related operations
 */
import { i18n } from './setupI18n';
import { unref, computed } from 'vue';
import type { LocaleType } from '/#/config';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { useSystemStoreWithOut } from '/@/stores/modules/SystemConfig';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const systemStore = useSystemStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  systemStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const systemStore = useSystemStoreWithOut();
  const getLocale = computed(() => systemStore.getLocaleInfo.locale);
  const getShowLocalePicker = computed(() => systemStore.getLocaleInfo.showPicker);

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
  };
}
