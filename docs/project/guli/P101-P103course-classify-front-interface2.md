---
title: P101-P103课程分类管理-课程分类显示接口（1-3）
date: 2021-06-01
---
[[TOC]]

**用递归遍历list成**



```java
    @GetMapping("subjectTreeList")
    public R subjectTreeList() {
        List<SubjectTree> treeList = subjectService.getTreeList();
        return R.ok().data("treeMenu", treeList);
    }
```

递归

```java
 @Override
    public List<SubjectTree> getTreeList() {
        QueryWrapper<EduSubject> queryWrapper = new QueryWrapper<>();
        //树形遍历  递归
        List<EduSubject> subjectList = this.list(queryWrapper);
        List<SubjectTree> rootTreeList = new ArrayList<>();

        for (EduSubject eduSubject : subjectList) {
            if (eduSubject.getParentId().equals("0")) {
                SubjectTree subjectTree = new SubjectTree();
                subjectTree.setId(eduSubject.getId());
                subjectTree.setLabel(eduSubject.getTitle());
                subjectTree.setParentId("0");
                rootTreeList.add(subjectTree);
            }
        }

        for (SubjectTree rootTree : rootTreeList) {
            buildChindTree(rootTree, subjectList);
        }
        return rootTreeList;
    }

    private void buildChindTree(SubjectTree subjectTree, List<EduSubject> subjectList) {
        List<SubjectTree> list = new ArrayList<>();
        for (EduSubject eduSubject : subjectList) {
            if (eduSubject.getParentId().equals(subjectTree.getId())) {
                SubjectTree tree = new SubjectTree();
                tree.setId(eduSubject.getId());
                tree.setParentId(eduSubject.getParentId());
                tree.setLabel(eduSubject.getTitle());
                list.add(tree);
                //递归调用
                buildChindTree(tree, subjectList);
                subjectTree.setChildren(list);
            }
        }
    }
```

