export function convertToHierarchy<
  T extends { children?: T[]; [key: string]: any }
>(items: T[], idKey: string, upperIdKey: string): T[] {
  // 결과를 저장할 맵 생성
  const itemMap = new Map<string, T>();

  // 최상위 아이템을 저장할 배열
  const rootItems: T[] = [];

  // 모든 아이템을 맵에 저장
  items.forEach((item) => {
    // 깊은 복사를 통해 원본 객체 변경 방지
    const newItem = { ...item, children: [] };
    // children 배열 초기화
    newItem.children = [];
    itemMap.set(item[idKey], newItem);
  });

  // 계층 구조 생성
  items.forEach((item) => {
    const currentItem = itemMap.get(item[idKey]);
    if (!currentItem) {
      throw new Error(`Item with id ${item[idKey]} not found in map`);
    }

    if (item[upperIdKey] === null) {
      // 상위 아이템이 없는 경우 최상위 배열에 추가
      rootItems.push(currentItem);
    } else {
      // 상위 아이템이 있는 경우 해당 아이템의 children 배열에 추가
      const parentItem = itemMap.get(item[upperIdKey]);
      if (parentItem) {
        parentItem.children?.push(currentItem);
      }
    }
  });

  return rootItems;
}

/**
 * 계층 구조를 만들 수 없는 아이템들의 ID를 찾는 함수
 * @param items 검사할 아이템 배열
 * @param idKey ID 필드명
 * @param upperIdKey 상위 아이템 ID 필드명
 * @returns 계층 구조를 만들 수 없는 아이템들의 ID 배열
 */
export function findInvalidCascadeItems<T extends { [key: string]: any }>(
  items: T[],
  idKey: string,
  upperIdKey: string
): string[] {
  // 모든 아이템의 ID를 Set으로 저장
  const existingIds = new Set(items.map((item) => item[idKey]));

  // 문제가 있는 아이템의 ID를 저장할 Set
  const invalidItemIds = new Set<string>();

  // 이미 체크한 아이템의 ID를 저장할 Set
  const checkedIds = new Set<string>();

  /**
   * 재귀적으로 아이템과 그 하위 아이템들의 유효성을 검사하는 함수
   */
  const validateItem = (itemId: string | null) => {
    // 이미 체크한 아이템이면 건너뜀 (순환 참조 방지)
    if (itemId === null || checkedIds.has(itemId)) {
      return;
    }

    checkedIds.add(itemId);

    // 현재 아이템 ID가 존재하지 않으면 invalid로 표시
    if (!existingIds.has(itemId)) {
      invalidItemIds.add(itemId);
    }

    // 현재 아이템을 상위 아이템으로 가지는 모든 하위 아이템을 찾아서 검사
    items.forEach((item) => {
      if (item[upperIdKey] === itemId) {
        // 상위 아이템이 invalid면 하위 아이템도 invalid
        if (invalidItemIds.has(itemId)) {
          invalidItemIds.add(item[idKey]);
        }
        // 재귀적으로 하위 아이템 검사
        validateItem(item[idKey]);
      }
    });
  };

  // 모든 아이템에 대해 검사 시작
  items.forEach((item) => {
    validateItem(item[upperIdKey]);
  });

  return Array.from(invalidItemIds);
}
