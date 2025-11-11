export interface PlaylistView {
    name: string;
    ownerName: string;
    ownerHref?: string;
    visibility: string;
    created: string;
    description: string;
    tracks: Track[];
}

export interface Track {
  title: string;
  href: string;
  added?: string;
}