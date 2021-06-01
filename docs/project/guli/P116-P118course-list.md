---
title: P116-P118课程管理-课程大纲列表
date: 2021-06-01
---
[[TOC]]





## P116-课程管理-课程大纲列表（后端）

**课程大纲列表**

![image-20200818060125429](https://gitee.com//nopromise/pic/raw/master/typora/20200818060125.png)





**随堂笔记**



![03-课程大纲列表功能](https://gitee.com//nopromise/pic/raw/master/typora/20200818060311.png)



### 1、定义vo

```java
@Data
@ApiModel(value = "章节信息")
public class ChapterVo {
    private static final long serialVersionUID = 1L;

    private String id;
    private String title;
    //小节
    private List<VideoVo> children = new ArrayList<>();
}
```

```java
@ApiModel(value = "课时信息")
@Data
public class VideoVo implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    private String title;
    private String free;
}
```



### 2、服务层

```java
public interface EduChapterService extends IService<EduChapter> {
    List<ChapterVo> nestedList(String courseId);
}
```

**实现类**

```java
@Service
public class EduChapterServiceImpl extends ServiceImpl<EduChapterMapper, EduChapter> implements EduChapterService {
    @Autowired
    private EduVideoService videoService;

    @Override
    public List<ChapterVo> nestedList(String courseId) {
        //最终要的到的数据列表
        ArrayList<ChapterVo> chapterVoArrayList = new ArrayList<>();
        //获取章节信息
        QueryWrapper<EduChapter> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("course_id", courseId);
        queryWrapper1.orderByAsc("sort", "id");
        List<EduChapter> chapters = baseMapper.selectList(queryWrapper1);

        //获取课时信息
        QueryWrapper<EduVideo> queryWrapper2 = new QueryWrapper<>();
        queryWrapper2.eq("course_id", courseId);
        queryWrapper2.orderByAsc("sort", "id");
        List<EduVideo> videos = videoService.list(queryWrapper2);

        //填充章节vo数据
        int count1 = chapters.size();
        for (int i = 0; i < count1; i++) {
            EduChapter chapter = chapters.get(i);
            //创建章节vo对象
            ChapterVo chapterVo = new ChapterVo();
            BeanUtils.copyProperties(chapter, chapterVo);
            chapterVoArrayList.add(chapterVo);
            //填充课时vo数据
            ArrayList<VideoVo> videoVoArrayList = new ArrayList<>();
            int count2 = videos.size();
            for (int j = 0; j < count2; j++) {
                EduVideo video = videos.get(j);
                if (chapter.getId().equals(video.getChapterId())) {
                    //创建课时vo对象
                    VideoVo videoVo = new VideoVo();
                    BeanUtils.copyProperties(video, videoVo);
                    videoVoArrayList.add(videoVo);
                }
            }
            chapterVo.setChildren(videoVoArrayList);
        }
        return chapterVoArrayList;
    }
}
```

### 3.web层

```java
@CrossOrigin //跨域
@RestController
@RequestMapping("/eduservice/eduChapter")
public class EduChapterController {
    @Autowired
    private EduChapterService chapterService;

    @ApiOperation(value = "嵌套章节数据列表")
    @GetMapping("chapterList/{courseId}")
    public R nestedListByCourseId(
            @ApiParam(name = "courseId", value = "课程ID", required = true)
            @PathVariable String courseId) {
        List<ChapterVo> chapterVoList = chapterService.nestedList(courseId);
        return R.ok().data("items", chapterVoList);
    }
}
```

### 4.swagger测试

![image-20200818060744240](https://gitee.com//nopromise/pic/raw/master/typora/20200818060744.png)







## P117&P118-课程管理-课程大纲列表（前端）

### 1、定义api

```js
import request from '@/utils/request'
const api_name = '/eduservice/eduChapter'

export default{
    /**
     * 根据课程id获取章节列表list，章节列表中包含小节list
     * @param {课程id} courseId 
     */
    getChapterList(courseId){
        return request({
            url:`${api_name}/chapterList/${courseId}`,
            method:'get'
        })
    }
}
```

### 2、定义组件脚本

定义data

```vue
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: "", // 所属课程
      chapterNestedList: [], // 章节嵌套课时列表
    };
  },
```

create和methods

```vue
  created() {
    this.init();
  },

  methods: {
    previous() {
      this.$router.push({ path: "/course/info/1" });
    },

    next() {
      this.$router.push({ path: "/course/publish/1" });
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        // 根据id获取课程基本信息
        this.fetchChapterNestedListByCourseId();
      }
    },

    fetchChapterNestedListByCourseId() {
      chapterApi.getChapterList(this.courseId).then((response) => {
        this.chapterNestedList = response.data.items;
      });
    },
  },
```

### 3、定义组件模板

```vue
<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button style type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
```

### 4、定义样式

将样式的定义放在页面的最后

scope表示这里定义的样式只在当前页面范围内生效，不会污染到其他的页面

```style
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;

  font-size: 20px;

  margin: 10px 0;

  padding: 10px;

  height: 70px;

  line-height: 50px;

  width: 100%;

  border: 1px solid #ddd;
}

.chanpterList .acts {
  float: right;

  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;

  font-size: 14px;

  margin: 10px 0;

  padding: 10px;

  height: 50px;

  line-height: 30px;

  width: 100%;

  border: 1px dotted #ddd;
}
</style>
```





### 5.效果

![image-20200818225555235](https://gitee.com//nopromise/pic/raw/master/typora/20200818225555.png)
=======

