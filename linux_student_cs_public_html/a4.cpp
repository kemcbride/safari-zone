#include <iostream>
#include <vector>
#include <queue>
#include <math.h>
using namespace std;

// Implementation Bipartie Coloring Checking Disks
// Kelly McBride
//

struct disk {
	int x;
	int y;
	int r; //radius
};

int element_index(vector<disk> input, disk s) {
	int i = 0;
	for(vector<disk>::iterator it = input.begin(); it != input.end(); ++it) {
		int xi = (*it).x;
		int yi = (*it).y;
		int ri = (*it).r;
		int x = s.x;
		int y = s.y;
		int r = s.r;
		if(xi == x && yi == y && ri == r) {
			return i;
		}
		i++;
	}
	return -1; // failure  ? ??!
}

// 2d array - adj matrix
int** graph_construct(vector<disk> input) {
	// where an adjacency is whether or not they overlap
	int n = input.size();
	int i = 0;
	int** adj_m = new int*[n];
	for(i=0; i<n; i++) {
		adj_m[i] = new int[n];
	}
	i=0; // again resetting
	for(vector<disk>::iterator it = input.begin(); it != input.end(); ++it) {
		// check if any other disks are within its range
		int j = 0;
		for(vector<disk>::iterator that = it; that != input.end(); ++that) {
			int xi = (*it).x;
			int yi = (*it).y;
			int ri = (*it).r;
			int xj = (*that).x;
			int yj = (*that).y;
			int rj = (*that).r;
			if(xi == xj && yi == yj && ri == rj) {
				// comparing point with self
				adj_m[i][j] = 0;
				adj_m[j][i] = 0;
			} else {
				cout << xi << ' ' << yi << ' ' << ri << '\n';
				cout << xj << ' ' << yj << ' ' << rj << '\n';
				float radius_dist = (rj + ri);
				float dist = sqrt(pow(xi-xj, 2) + pow(yi-yj, 2));
				if( radius_dist < dist ) {
					cout << "no overlap\n";
					adj_m[i][j] = 0;
					adj_m[j][i] = 0;
				} else {
					cout << "overlap\n";
					adj_m[i][j] = 1;
					adj_m[j][i] = 1; // they are adjacent
				}
			}
			j++;
		}

		i++;
	}
	return adj_m;
}

void bipartition(vector<disk> input, int** adj_m) {
	int i = 0;
	int n = input.size();
	int color[n];
	int dist[n];
	queue<disk> bfs_q = queue<disk>();
	vector<disk> x = vector<disk>();
	vector<disk> y = vector<disk>();
	// so now we will do the BFS
	for(vector<disk>::iterator it = input.begin(); it != input.end(); ++it) {
		color[i] = 2; // 2 white, 1 gray, 0 black
		i++;
	}
	i=0;
	disk s = input.front(); // start with the first one, i guess
	bfs_q.push(s);
	dist[i] = 0;
	x.push_back(s);
	color[i]--;
	while(!bfs_q.empty()) { // i think they will be sparse graphs so... think hard
		disk u = bfs_q.front();
		i = element_index(input, u);
		bfs_q.pop();
		for(int j=0; j<n; j++) {
			if (adj_m[i][j] == 1) {
				if(color[j] == 2) { // white
					color[j]--;
					bfs_q.push(input.at(j));
					dist[j] = dist[i] +1;
					if(dist[j]%2 == 0){
						x.push_back(input.at(j));
					} else y.push_back(input.at(j));
				}
			}
		}
		color[i] = 0;
	}
	for(vector<disk>::iterator it = input.begin(); it != input.end(); ++it) {
		if(element_index(x, (*it))) {
			cout << "1 ";
		} else {
			cout << "2 ";
		}
	}
}

int main(int argc, char** argv) {
	vector<disk> inputs = vector<disk>();
	int val = 0;
	disk cur;
	cur.x = NULL;
	cur.y = NULL;
	cur.r = NULL;
	int n = 0;
	cin >> n;

	while (cin >> val) {
		if(cur.x == NULL) {
			cur.x = val;
		} else if(cur.y == NULL) {
			cur.y = val;
		} else {
			cur.r = val;
			inputs.push_back(cur);
			cur.x = NULL;
			cur.y = NULL;
			cur.r = NULL;
		}
	}

	cout << inputs.size() << "\n";
	int** adj_m = graph_construct(inputs);
	// now supposing this adj_m is correct

	bipartition(inputs, adj_m);
	return 0;
}
