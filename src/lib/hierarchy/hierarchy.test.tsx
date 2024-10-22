import { convertToHierarchy } from ".";

describe("convertToHierarchy 함수", () => {
  it("todo_item 리스트를 받고, 계층화해서 반환한다.", () => {
    expect(
      convertToHierarchy(
        [
          {
            id: "659ebf59-fd26-4de6-b63e-036d9a00d7f3",
            project_id: "c2ce67c9-8034-461e-8f52-13f2704d9dd5",
            user_id: "38557b15-89d8-4493-8c48-938746cf6f2f",
            created_at: "2024-10-22T05:01:47.184516+00:00",
            name: "업로드 성공한 파일 변경 시, 상태와 업로드 아이디 제거",
            plan_started: null,
            plan_ended: null,
            actual_started: null,
            actual_ended: null,
            progress: 0,
            assignees: null,
            notes: null,
            upper_item_id: "73e3380b-c2bd-4d29-85a7-9544cdefe8ad",
          },
          {
            id: "73e3380b-c2bd-4d29-85a7-9544cdefe8ad",
            project_id: "c2ce67c9-8034-461e-8f52-13f2704d9dd5",
            user_id: "38557b15-89d8-4493-8c48-938746cf6f2f",
            created_at: "2024-10-22T05:00:26.710947+00:00",
            name: "[] 업로드 파일 갱신 예외 처리",
            plan_started: null,
            plan_ended: null,
            actual_started: null,
            actual_ended: null,
            progress: 0,
            assignees: null,
            notes: null,
            upper_item_id: null,
          },
        ],
        "id",
        "upper_item_id"
      )
    ).toStrictEqual([
      {
        actual_ended: null,
        actual_started: null,
        assignees: null,
        children: [
          {
            actual_ended: null,
            actual_started: null,
            assignees: null,
            children: [],
            created_at: "2024-10-22T05:01:47.184516+00:00",
            id: "659ebf59-fd26-4de6-b63e-036d9a00d7f3",
            name: "업로드 성공한 파일 변경 시, 상태와 업로드 아이디 제거",
            notes: null,
            plan_ended: null,
            plan_started: null,
            progress: 0,
            project_id: "c2ce67c9-8034-461e-8f52-13f2704d9dd5",
            upper_item_id: "73e3380b-c2bd-4d29-85a7-9544cdefe8ad",
            user_id: "38557b15-89d8-4493-8c48-938746cf6f2f",
          },
        ],
        created_at: "2024-10-22T05:00:26.710947+00:00",
        id: "73e3380b-c2bd-4d29-85a7-9544cdefe8ad",
        name: "[] 업로드 파일 갱신 예외 처리",
        notes: null,
        plan_ended: null,
        plan_started: null,
        progress: 0,
        project_id: "c2ce67c9-8034-461e-8f52-13f2704d9dd5",
        upper_item_id: null,
        user_id: "38557b15-89d8-4493-8c48-938746cf6f2f",
      },
    ]);
  });
});
