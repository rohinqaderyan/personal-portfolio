"""
K-Nearest Neighbors (KNN) Classifier
Implements unweighted and weighted KNN with K = 1, 2, 3
Uses squared Euclidean distance; weight = 1 / distance^2
"""

from collections import defaultdict

# ── Dataset ──────────────────────────────────────────────────────────────
# Each entry: (Row_NO, Sample_ID, F1, F2, F3, F4, Class)
DATA = [
    ( 1, 1000025, 5, 1, 1, 1, 2),
    ( 2, 1002945, 5, 4, 4, 5, 2),
    ( 3, 1015425, 3, 1, 1, 1, 2),
    ( 4, 1016277, 6, 8, 8, 1, 2),
    ( 5, 1017023, 4, 1, 1, 3, 2),
    ( 6, 1017122, 8,10,10, 8, 4),
    ( 7, 1018099, 1, 1, 1, 1, 2),
    ( 8, 1018561, 2, 1, 2, 1, 2),
    ( 9, 1033078, 2, 1, 1, 1, 2),
    (10, 1033078, 4, 2, 1, 1, 2),
    (11, 1035283, 1, 1, 1, 1, 2),
    (12, 1036172, 2, 1, 1, 1, 2),
    (13, 1041801, 5, 3, 3, 3, 4),
    (14, 1043999, 1, 1, 1, 1, 2),
    (15, 1044572, 8, 7, 5,10, 4),
    (16, 1047630, 7, 4, 6, 4, 4),
    (17, 1048672, 4, 1, 1, 1, 2),
    (18, 1049815, 4, 1, 1, 1, 2),
    (19, 1050670,10, 7, 7, 6, 4),
    (20, 1050718, 6, 1, 1, 1, 2),
    (21, 1054590, 7, 3, 2,10, 4),
    (22, 1054593,10, 5, 5, 3, 4),
    (23, 1056784, 3, 1, 1, 1, 2),
    (24, 1057013, 8, 4, 5, 1, 4),
    (25, 1059552, 1, 1, 1, 1, 2),
    (26, 1065726, 5, 2, 3, 4, 4),
    (27, 1066373, 3, 2, 1, 1, 2),
    (28, 1066979, 5, 1, 1, 1, 2),
    (29, 1067444, 2, 1, 1, 1, 2),
    (30, 1070935, 1, 1, 3, 1, 2),
]

# Constant used when two points have identical features (distance = 0)
ZERO_DIST_WEIGHT = 1e24


# ── Helper functions ─────────────────────────────────────────────────────
def extract_features(record):
    """Return the four feature values from a data record."""
    return record[2], record[3], record[4], record[5]


def sq_euclidean(a, b):
    """Squared Euclidean distance between two 4-tuples."""
    return sum((ai - bi) ** 2 for ai, bi in zip(a, b))


def majority_vote(class_labels):
    """Return the class with the most votes (simple majority)."""
    counts = defaultdict(int)
    for lbl in class_labels:
        counts[lbl] += 1
    return max(counts, key=counts.get)


def weighted_vote(classes, weights):
    """Return the class with the highest total weight."""
    totals = defaultdict(float)
    for cls, w in zip(classes, weights):
        totals[cls] += w
    winner = max(totals, key=totals.get)
    return winner, dict(totals)


def knn_neighbors(test_rec, train_set, k):
    """
    Find the k nearest training records to test_rec.
    Returns list of (distance, row_no, class_label) sorted ascending.
    Ties are broken by row number (lower first).
    """
    test_feats = extract_features(test_rec)
    dists = []
    for tr in train_set:
        d = sq_euclidean(test_feats, extract_features(tr))
        dists.append((d, tr[0], tr[6]))          # (dist, Row_NO, Class)
    dists.sort(key=lambda x: (x[0], x[1]))       # distance first, then Row_NO
    return dists[:k]


# ── Main routine ─────────────────────────────────────────────────────────
def run():
    test_rows = {6, 12, 18, 24, 30}
    train = [r for r in DATA if r[0] not in test_rows]
    test  = [r for r in DATA if r[0] in test_rows]

    # ── 1) Data split info ───────────────────────────────────────────────
    print("1) DATA SPLIT")
    print(f"Test Row_NO: {sorted(test_rows)}")
    print(f"Training count: {len(train)}  |  Test count: {len(test)}")
    print("\nTest records (Row_NO, Sample, F1, F2, F3, F4, Class):")
    for r in test:
        f = extract_features(r)
        print(f"  Row {r[0]:2d} | Sample {r[1]} | "
              f"F1={f[0]} F2={f[1]} F3={f[2]} F4={f[3]} | Class={r[6]}")

    # ── 2) KNN predictions ───────────────────────────────────────────────
    print("\n2) KNN CLASSIFICATION RESULTS")
    print("(Predictions for EACH test record)")

    ks = [1, 2, 3]
    results = {k: {"uw": [], "w": []} for k in ks}   # store (actual, pred)

    for t in test:
        row_no, sample, actual = t[0], t[1], t[6]
        print(f"\n--- Test Row {row_no} (Sample {sample}), Actual Class = {actual} ---")

        for k in ks:
            nbrs = knn_neighbors(t, train, k)
            nbr_rows    = [n[1] for n in nbrs]
            nbr_classes = [n[2] for n in nbrs]

            # Unweighted prediction
            pred_uw = majority_vote(nbr_classes)
            results[k]["uw"].append((actual, pred_uw))
            print(f"  K={k} Unweighted -> Pred={pred_uw} | "
                  f"Neighbors Row_NO={nbr_rows} | Neighbor Classes={nbr_classes}")

            # Weighted prediction
            wts = []
            for dist, _, _ in nbrs:
                wts.append(ZERO_DIST_WEIGHT if dist == 0 else 1.0 / dist)

            pred_w, cls_sums = weighted_vote(nbr_classes, wts)
            results[k]["w"].append((actual, pred_w))

            wt_str   = "[" + ", ".join(f"{w:g}" for w in wts) + "]"
            sums_str = "{" + ", ".join(f"{c}: {s:g}" for c, s in cls_sums.items()) + "}"
            print(f"  K={k} Weighted   -> Pred={pred_w} | "
                  f"Neighbors Row_NO={nbr_rows} | Classes={nbr_classes} | "
                  f"Weights={wt_str} | ClassWeightSums={sums_str}")

    # ── 3) Accuracy ──────────────────────────────────────────────────────
    print("\n3) ACCURACY MEASUREMENT")
    print("Accuracy = (# correct predictions) / (total test records)")

    for label, key in [("UNWEIGHTED", "uw"), ("WEIGHTED", "w")]:
        print(f"\n{label} KNN ACCURACY")
        for k in ks:
            pairs   = results[k][key]
            correct = sum(a == p for a, p in pairs)
            total   = len(pairs)
            print(f"  K={k}: accuracy={correct/total:.2f}  ({correct}/{total} correct)")


if __name__ == "__main__":
    run()
