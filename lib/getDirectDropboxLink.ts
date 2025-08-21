export function getDirectDropboxLink(url: string): string {
  if (!url) return url;

  let directUrl = url;

  if (directUrl.includes("www.dropbox.com")) {
    directUrl = directUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  }

  if (directUrl.includes("dropbox.com/s/")) {
    directUrl = directUrl.replace("dropbox.com", "dl.dropboxusercontent.com");
  }

  if (directUrl.includes("?dl=0")) {
    directUrl = directUrl.replace("?dl=0", "?raw=1");
  } else if (!directUrl.includes("?raw=1")) {
    directUrl += "?raw=1";
  }

  return directUrl;
}
