import type { GitHubPullRequestData, GitHubCommitData } from "$/lib/typings/github";

export class SequentialFetchQueue {
  private queue: Array<[ string, () => Promise<Response>, (response: Response) => void | Promise<void> ]> = [ ];
  private isProcessing = false;

  public add(id: string, fetcher: () => Promise<Response>, afterFetch: (response: Response) => void | Promise<void>): void {
    if(this.queue.some(([ queuedId ]) => queuedId === id)) {
      return;
    }

    this.queue.push([ id, fetcher, afterFetch ]);
    void this.next();
  }

  private async next(): Promise<void> {
    if(this.queue.length === 0 || this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    const [ , fetcher, afterFetch ] = this.queue.shift()!;  // eslint-disable-line @typescript-eslint/no-non-null-assertion
    await afterFetch(await fetcher());

    this.isProcessing = false;
    await this.next();
  }
}

export const githubDataFetchQueue = new SequentialFetchQueue();
export const githubPullRequestDataStore = $state<Record<string, GitHubPullRequestData>>({ });
export const githubCommitDataStore = $state<Record<string, GitHubCommitData>>({ });
