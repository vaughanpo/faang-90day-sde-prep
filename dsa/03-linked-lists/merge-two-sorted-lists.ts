/**
 * 21. Merge Two Sorted Lists (LeetCode Easy)
 * Pattern: Dummy Head Pointer
 * Time Complexity: O(n + m), Space Complexity: O(1)
 */

// Iterative solution
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

var mergeTwoLists = function (list1: ListNode | null, list2: ListNode | null) {
  const dummy = new ListNode(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 !== null ? list1 : list2;
  return dummy.next;
};

export default mergeTwoLists;

// Recursive solution
// var mergeTwoLists = function (
//   list1: ListNode | null,
//   list2: ListNode | null,
// ): ListNode | null {
//   if (!list1) return list2;
//   if (!list2) return list1;

//   if (list1.val <= list2.val) {
//     list1.next = mergeTwoLists(list1.next, list2);
//     return list1;
//   } else {
//     list2.next = mergeTwoLists(list1, list2.next);
//     return list2;
//   }
// };

// export default mergeTwoLists;
