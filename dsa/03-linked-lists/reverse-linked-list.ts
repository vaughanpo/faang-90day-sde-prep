/**
 * 206. Reverse Linked List (LeetCode Easy)
 * Pattern: Iterative / Recursive Pointer Manipulation
 * Time Complexity: O(n), Space Complexity: O(1)
 */

type LinkedListNode = { next: LinkedListNode | null };

var reverseList = function (
  head: LinkedListNode | null,
): LinkedListNode | null {
  let previous: LinkedListNode | null = null;
  let current = head;

  while (current !== null) {
    let nextTemp = current.next;
    current.next = previous;
    previous = current;
    current = nextTemp;
  }

  return previous;
};

export default reverseList;
