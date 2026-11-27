import { Icon } from '../Icon/Icon.jsx';
import {
  ContactHint,
  ContactSection,
  LinkChevron,
  NetworkIcon,
  NetworkList,
  NetworkRow,
  SectionTitle,
  WebsiteCard,
  WebsiteDescription,
  WebsiteText,
  WebsiteTitle,
} from './LinksLoja.styles.js';

export function LinksLoja({ website, socialNetworks }) {
  return (
    <ContactSection>
      <SectionTitle>Visite nosso site</SectionTitle>
      <WebsiteCard
        as={website.href ? 'a' : 'div'}
        href={website.href || undefined}
        target={website.href ? '_blank' : undefined}
        rel={website.href ? 'noopener noreferrer' : undefined}
      >
        <WebsiteText>
          <WebsiteTitle>{website.title}</WebsiteTitle>
          <WebsiteDescription>{website.description}</WebsiteDescription>
        </WebsiteText>
        <LinkChevron><Icon name="chevronDown" size={16} /></LinkChevron>
      </WebsiteCard>

      <SectionTitle $spaced>Encontre a gente</SectionTitle>
      <NetworkList>
        {socialNetworks.map((network) => (
          <NetworkRow
            key={network.name}
            as={network.href ? 'a' : 'div'}
            href={network.href || undefined}
            target={network.href ? '_blank' : undefined}
            rel={network.href ? 'noopener noreferrer' : undefined}
          >
            <NetworkIcon $network={network.name} aria-hidden="true">
              <Icon name={network.icon} size={20} />
            </NetworkIcon>
            <span>{network.name}</span>
            <LinkChevron><Icon name="chevronDown" size={16} /></LinkChevron>
          </NetworkRow>
        ))}
      </NetworkList>
      <ContactHint>Adicione os links das redes oficiais da loja.</ContactHint>
    </ContactSection>
  );
}
