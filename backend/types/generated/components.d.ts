import type { Schema, Struct } from '@strapi/strapi';

export interface FormsFormAgree extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_agrees';
  info: {
    displayName: 'FormAgree';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsFormCheckboxes extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_checkboxes';
  info: {
    displayName: 'FormCheckboxes';
  };
  attributes: {
    items: Schema.Attribute.Component<'forms.form-checkboxes-list', true>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['checkbox', 'radio']> &
      Schema.Attribute.DefaultTo<'checkbox'>;
  };
}

export interface FormsFormCheckboxesList extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_checkboxes_lists';
  info: {
    displayName: 'FormCheckboxesList';
  };
  attributes: {
    isChecked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface FormsFormInput extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_inputs';
  info: {
    displayName: 'FormInput';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['text', 'email']>;
  };
}

export interface FormsFormSelect extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_selects';
  info: {
    displayName: 'FormSelect';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'forms.form-select-options', true>;
    placeholder: Schema.Attribute.String;
  };
}

export interface FormsFormSelectOptions extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_select_options';
  info: {
    displayName: 'FormSelectOptions';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface FormsFormSubmit extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_submits';
  info: {
    displayName: 'FormSubmit';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface FormsFormTextarea extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_textareas';
  info: {
    displayName: 'FormTextarea';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    Menu: Schema.Attribute.Component<'layout.menu-footer', false>;
    textBottom: Schema.Attribute.RichText;
    textTop: Schema.Attribute.RichText;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    LangList: Schema.Attribute.Component<'shared.lang-list', false>;
    Logo: Schema.Attribute.Component<'shared.link', false>;
    Menu: Schema.Attribute.Component<'layout.menu-main', false>;
  };
}

export interface LayoutMenuFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_menu_footers';
  info: {
    displayName: 'MenuFooter';
  };
  attributes: {
    MenuLink: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface LayoutMenuMain extends Struct.ComponentSchema {
  collectionName: 'components_layout_menu_mains';
  info: {
    displayName: 'MenuMain';
  };
  attributes: {
    MenuLink: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface LayoutSeo extends Struct.ComponentSchema {
  collectionName: 'components_layout_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    canonical: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaKeywords: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.Text;
    nofollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.Text;
    ogType: Schema.Attribute.String & Schema.Attribute.DefaultTo<'website'>;
    structuredData: Schema.Attribute.Text;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    description: Schema.Attribute.Text;
    gallery: Schema.Attribute.Relation<'oneToOne', 'api::gallery.gallery'>;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsMap extends Struct.ComponentSchema {
  collectionName: 'components_sections_maps';
  info: {
    displayName: 'Map';
  };
  attributes: {
    description: Schema.Attribute.Text;
    location: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::strapi-location-picker.location-picker',
        {
          info: true;
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_sections_opening_hours';
  info: {
    displayName: 'Opening hours';
  };
  attributes: {
    description: Schema.Attribute.Text;
    left_column: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    right_column: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsRequest extends Struct.ComponentSchema {
  collectionName: 'components_sections_requests';
  info: {
    displayName: 'Request';
  };
  attributes: {
    description: Schema.Attribute.Text;
    form: Schema.Attribute.Relation<'oneToOne', 'api::form.form'>;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.Text;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'Text Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'Title'>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    buttonType: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
    text: Schema.Attribute.String;
  };
}

export interface SharedLangList extends Struct.ComponentSchema {
  collectionName: 'components_shared_lang_lists';
  info: {
    displayName: 'LangList';
  };
  attributes: {
    Link: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    buttonType: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']> &
      Schema.Attribute.DefaultTo<'PRIMARY'>;
    image: Schema.Attribute.Media<'images'>;
    isAnchor: Schema.Attribute.Boolean;
    isButton: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'forms.form-agree': FormsFormAgree;
      'forms.form-checkboxes': FormsFormCheckboxes;
      'forms.form-checkboxes-list': FormsFormCheckboxesList;
      'forms.form-input': FormsFormInput;
      'forms.form-select': FormsFormSelect;
      'forms.form-select-options': FormsFormSelectOptions;
      'forms.form-submit': FormsFormSubmit;
      'forms.form-textarea': FormsFormTextarea;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.menu-footer': LayoutMenuFooter;
      'layout.menu-main': LayoutMenuMain;
      'layout.seo': LayoutSeo;
      'sections.about': SectionsAbout;
      'sections.gallery': SectionsGallery;
      'sections.hero': SectionsHero;
      'sections.map': SectionsMap;
      'sections.opening-hours': SectionsOpeningHours;
      'sections.request': SectionsRequest;
      'sections.services': SectionsServices;
      'sections.text-section': SectionsTextSection;
      'shared.button': SharedButton;
      'shared.lang-list': SharedLangList;
      'shared.link': SharedLink;
    }
  }
}
