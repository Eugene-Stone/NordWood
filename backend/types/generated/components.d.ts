import type { Schema, Struct } from '@strapi/strapi';

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
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.menu-footer': LayoutMenuFooter;
      'layout.menu-main': LayoutMenuMain;
      'sections.hero': SectionsHero;
      'sections.services': SectionsServices;
      'sections.text-section': SectionsTextSection;
      'shared.button': SharedButton;
      'shared.lang-list': SharedLangList;
      'shared.link': SharedLink;
    }
  }
}
