export type Site = {
  name: string;
  url: string;
  description: string;
};

export const sites: Site[] = [
  {
    name: "Stacker News",
    url: "https://stacker.news",
    description:
      "A Bitcoin-focused social news platform that uses Lightning Login for authentication.",
  },
  {
    name: "LN Markets",
    url: "https://lnmarkets.com",
    description:
      "A Bitcoin derivatives trading platform that supports Lightning Login.",
  },
  {
    name: "Wavlake",
    url: "https://wavlake.com",
    description:
      "A music streaming platform for independent artists using Lightning payments and authentication.",
  },
  {
    name: "Fountain",
    url: "https://fountain.fm",
    description:
      "A podcasting platform with Lightning integration and Lightning Login support.",
  },
  {
    name: "Breez",
    url: "https://breez.technology",
    description:
      "A Lightning wallet and app that demonstrates Lightning Login integration.",
  },
  {
    name: "Sats Names",
    url: "https://satsnames.com",
    description:
      "A decentralized naming service for Bitcoin that uses Lightning Login.",
  },
];

