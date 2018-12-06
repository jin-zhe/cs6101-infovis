import csv
import sys

def load_csv(csv_path):
  """Returns all the rows of a csv file"""
  rows = []
  with open(csv_path, 'r') as csvfile:
    csv_reader = csv.reader(csvfile)
    for row in csv_reader:
      rows.append(row)
  return rows

def write_csv(rows, output_path, delimiter=','):
  """Writes out rows to csv file given output path"""
  with open(output_path, 'w') as csvfile:
    out_writer = csv.writer(csvfile, delimiter=delimiter)
    for row in rows:
      out_writer.writerow(row)

def average(data):
    return [sum(col)/len(col) for col in zip(*data)]

def main(csv_path, out_path, bin_size=10):
    out = []
    acc = []
    rows = load_csv(csv_path)
    out.append(rows[0]) # copy header
    for i in range(1, len(rows)):
        acc.append([float(x) for x in rows[i][2:]])
        if len(acc) == bin_size:
            out.append(rows[i][0:2] + average(acc))
            acc = [] # reset
    if (len(acc)) > 1:
        out.append(rows[-1][0:2] + average(acc))

    write_csv(out, out_path)



if __name__ == '__main__': main(sys.argv[1], sys.argv[2])