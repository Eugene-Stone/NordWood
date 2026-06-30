import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    Copyright: Schema.Attribute.String;
    Menu: Schema.Attribute.Component<'layout.menu-footer', false>;
    TextBottom: Schema.Attribute.RichText;
    TextTop: Schema.Attribute.RichText;
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

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    ButtonType: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
    Text: Schema.Attribute.String;
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
    ButtonType: Schema.Attribute.Enumeration<['PRIMARY', 'SECONDARY']> &
      Schema.Attribute.DefaultTo<'PRIMARY'>;
    Image: Schema.Attribute.Media<'images'>;
    isButton: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.menu-footer': LayoutMenuFooter;
      'layout.menu-main': LayoutMenuMain;
      'shared.button': SharedButton;
      'shared.lang-list': SharedLangList;
      'shared.link': SharedLink;
    }
  }
}
