import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Box, IconButton, SlideFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DynamicsBlog, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import BlogTile from "../BlogTile";

interface IHighlightNewsSectionProps {
  dynamicsBlogs?: DynamicsBlog[];
  dynamicsPageSection: DynamicsPageSection;
}

const HighlightNewsSection: React.FunctionComponent<
  IHighlightNewsSectionProps
> = ({ dynamicsBlogs, dynamicsPageSection }) => {
  const [activeBlog, setActiveBlog] = useState(0);
  const [userHasManuallyChangedBlog, setUserHasManuallyChangedBlog] =
    useState(false);
  const prevPage = () => {
    setActiveBlog((prevState) => {
      if (prevState === 0) {
        return 3;
      } else {
        return prevState - 1;
      }
    });
  };
  const nextPage = () => {
    setActiveBlog((prevState) => {
      if (prevState === 3) {
        return 0;
      } else {
        return prevState + 1;
      }
    });
  };

  useEffect(() => {
    if (userHasManuallyChangedBlog) {
      return;
    }
    let timer = setInterval(() => nextPage(), 5000);
    return () => {
      clearInterval(timer);
    };
  }, [userHasManuallyChangedBlog]);
  if (!dynamicsBlogs) {
    return null;
  }
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
    >
      <Box
        w="100%"
        overflow="hidden"
        h="500px"
        backgroundColor="rgb(241,241,241)"
        pb={12}
      >
        <Flex w="400%" h="100%" transform={`translateX(-${activeBlog * 25}%)`}>
          {dynamicsBlogs.map((db, index) => {
            if (index < 4)
              return (
                <Box key={db.bsi_blogid} width="100vw" px={8} h="100%">
                  <SlideFade
                    in={activeBlog === index}
                    offsetX="100px"
                    style={{ height: "100%" }}
                    transition={{ enter: { duration: 0.5 } }}
                  >
                    <BlogTile
                      size="xl"
                      blogTitle={db.bsi_name}
                      blogAuthors={db.bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor}
                      blogTags={db.bsi_BlogCategory_bsi_Blog_bsi_Blog}
                      blogSlug={db.bsi_slug}
                      blogCoverImageUrl={db.bsi_BlogCoverImage.bsi_cdnurl}
                      blogCoverImageAltText={db.bsi_BlogCoverImage.bsi_alttext}
                      blogCoverText={db.bsi_blogcovertext}
                      publishDate={new Date(db.modifiedon)}
                    />
                  </SlideFade>
                </Box>
              );
          })}
        </Flex>
      </Box>
      <Flex
        mx="auto"
        justify="center"
        align="center"
        backgroundColor="rgb(241,241,241)"
        pb={8}
        style={{ gap: "15px" }}
      >
        <IconButton
          aria-label="Previous Post"
          icon={<ChevronLeftIcon />}
          backgroundColor="transparent"
          onClick={() => {
            prevPage();
            setUserHasManuallyChangedBlog(() => true);
          }}
        />
        <Text as="span">{activeBlog + 1}/4</Text>
        <IconButton
          aria-label="Next Post"
          icon={<ChevronRightIcon />}
          backgroundColor="transparent"
          onClick={() => {
            nextPage();
            setUserHasManuallyChangedBlog(() => true);
          }}
        />
      </Flex>
      <Flex
        width="100%"
        mx="auto"
        px={16}
        flexWrap="wrap"
        pb={16}
        style={{ gap: "4%" }}
        backgroundColor="rgb(241,241,241)"
      >
        {dynamicsBlogs.map((db, index) => {
          if (index < 4)
            return (
              <Box
                key={db.bsi_blogid}
                width="22%"
                pb={8}
                cursor="pointer"
                onClick={() => {
                  setActiveBlog(() => index);
                  setUserHasManuallyChangedBlog(() => true);
                }}
              >
                <BlogTile
                  size="mini"
                  active={activeBlog === index}
                  userClicked={userHasManuallyChangedBlog}
                  blogTitle={db.bsi_name}
                  blogAuthors={db.bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor}
                  blogTags={db.bsi_BlogCategory_bsi_Blog_bsi_Blog}
                  blogSlug={db.bsi_slug}
                  blogCoverImageUrl={db.bsi_BlogCoverImage.bsi_cdnurl}
                  blogCoverImageAltText={db.bsi_BlogCoverImage.bsi_alttext}
                  blogCoverText={db.bsi_blogcovertext}
                  publishDate={new Date(db.modifiedon)}
                />
              </Box>
            );
        })}
      </Flex>
    </AnchorSection>
  );
};

export default HighlightNewsSection;