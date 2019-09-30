// Episode
interface RSSFeedEnclosure {
  url: string;
  length: string;
  type: string;
}

interface RSSFeedItunes {
  author: string;
  subtitle: string;
  summary: string;
  explicit: string;
  duration: string;
}

export interface IEpisodeItem {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  "content:encoded": string;
  enclosure: RSSFeedEnclosure;
  "dc:creator": string;
  comments: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  isoDate: string;
  itunes?: RSSFeedItunes;
}


// Podcast
export interface PodcastHostTwitter {
  link: string;
  username: string;
}

export interface PodcastHost {
  name: string;
  twitter: PodcastHostTwitter;
}

export interface PodcastExternalLink {
  title: string;
  url: string;
}

export interface IPodcastItem {
  category: string;
  title: string;
  description: string;
  external?: PodcastExternalLink;
  frequency?: string;
  hosts: PodcastHost[];
  rss: string;
  runtime: string;
  web?: PodcastExternalLink;
}



