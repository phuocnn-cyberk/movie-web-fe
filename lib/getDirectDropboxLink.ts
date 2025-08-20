// lib/getDirectDropboxLink.ts
export function getDirectDropboxLink(url: string): string {
  if (!url) return url;

  let directUrl = url;

  // Trường hợp www.dropbox.com
  if (directUrl.includes("www.dropbox.com")) {
    directUrl = directUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  }

  // Trường hợp dropbox.com/s/xxx
  if (directUrl.includes("dropbox.com/s/")) {
    directUrl = directUrl.replace("dropbox.com", "dl.dropboxusercontent.com");
  }

  // Đảm bảo query là ?raw=1
  if (directUrl.includes("?dl=0")) {
    directUrl = directUrl.replace("?dl=0", "?raw=1");
  } else if (!directUrl.includes("?raw=1")) {
    directUrl += "?raw=1";
  }

  return directUrl;
}
